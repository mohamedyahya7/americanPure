import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import * as Yup from "yup";

import { edit } from "../api/customerServiceService";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import DatePicker from "../components/DatePicker.js";
import defaultStyles from "../config/styles";
import ActivityIndicator from "../components/ActivityIndicator.js";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("الاسم الاول مطلوب"),
  last_name: Yup.string().required("باقي الاسم مطلوب"),
  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
   .min(11, "اقل عدد من الارقام 11")
    .max(11)
    .matches(/^\d+$/),
  phone2: Yup.string()
    .required("رقم الهاتف مطلوب")
    .min(11, "اقل عدد من الارقام 11")
    .max(11)
    .matches(/^\d+$/),
  nationalId: Yup.string()
    .required("الرقم القومي مطلوب")
    .min(14, "اقل عدد من الارقام 14")
    .max(14)
    .matches(/^\d+$/),

  installment_amount: Yup.number().required("مبلغ القسط مطلوب"),
  installments_count: Yup.number().required("عدد القسط مطلوب"),
  payMethod: Yup.object().required("طريقة الدفع مطلوبة"),
  start_date: Yup.date().required("تاريخ البدء مطلوب"),

  address: Yup.string().required("العنوان مطلوب"),
  zone: Yup.object().required("المنطقة مطلوبة"),
});

const payMethod = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "كاش",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "قسط",
    value: 2,
  },
];
const zones = [
  { label: "المنطقة الاولي", value: 1 },
  { label: "المنطقة الثانية", value: 2 },
];

function EditOrderScreen({order,setModal,refresh}) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(order.installment_amount);
  const [count, setCount] = useState(order.installments_count);
  let price = amount * count;

 

    async function handleSubmit(formOrder, { resetForm }) {

    
    let newFormOrder = {
      ...formOrder,
      payment_method: formOrder.payMethod.value,
      zone_id: formOrder.zone.value,
      id: order.id,
    };
    console.log("newFormOrder", newFormOrder);
    setProgress(0);
    setUploadVisible(true);

    try {
      const {data} = await edit(newFormOrder, (progress) =>
        setProgress(progress)
      );
        resetForm();
        setModal(false);
        refresh();
    } catch (error) {
        console.log("error from edit order", error.message);
      alert("حدث خطأ أثناء تعديل الطلب");
    }
    setUploadVisible(false);
    // (async()=> {
    //   //"location": {"latitude": 31.1191959, "longitude": 29.790650}
    //   const value = await AsyncStorage.getItem(key);
    //   const items = JSON.parse(value)
    //   if (!items) {
    //     await AsyncStorage.setItem(key , JSON.stringify([{...newFormOrder}]));
    //   }else{
    //     const updatedItems = [{...newFormOrder},...items];
    //     await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
    //    console.log('u;',updatedItems)
    //   }})(newFormOrder);
    // resetForm();
  }

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <UploadScreen
          onDone={() => console.log("done")}
          progress={progress}
          visible={uploadVisible}
        />
        {/* <ActivityIndicator visible={loading} /> */}
        
        <KeyboardAvoidingView behavior={"height"} keyboardVerticalOffset={1}>
          {/* {Platform.OS==='ios'?'padding':'height'} */}
          <ScrollView>
            <Form
              initialValues={{
                first_name: order.first_name,
                last_name: order.last_name,
                phone: order.phone,
                phone2: order.phone2,
                nationalId: order.nationalId,
                payMethod: payMethod.find(p=>p.value==order.payment_method),
                zone: zones.find(z=>z.value==order.zone_id),
                installment_amount:amount.toString(),
                installments_count: count.toString(),
                address: order.address,
                start_date: new Date(order.start_date),
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >

              <View style={styles.row}>
                <View style={{ width: "35%" }}>
                  <FormField
                    maxLength={255}
                    name="first_name"
                    placeholder="الاسم الاول"
                    row={true}
                  />
                </View>
                <View style={{ width: "65%" }}>
                  <FormField
                    maxLength={255}
                    name="last_name"
                    placeholder=" باقي الاسم "
                    row={true}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <FormField
                  keyboardType="numeric"
                  maxLength={11}
                  name="phone"
                  icon="whatsapp"
                  // placeholder="رقم الهاتف"
                  width="48%"
                  row={true}
                />
                <FormField
                  keyboardType="numeric"
                  maxLength={11}
                  name="phone2"
                  icon="phone"
                  // placeholder="رقم الهاتف"
                  width="48%"
                  row={true}
                />
              </View>
              <View style={styles.row}>
                <Picker
                  items={zones}
                  name="zone"
                  PickerItemComponent={CategoryPickerItem}
                  placeholder="المنطقة"
                  width="50%"
                />
                <FormField
                  keyboardType="numeric"
                  maxLength={14}
                  name="nationalId"
                  placeholder="الرقم القومي"
                  width="65%"
                  row={true}
                />
              </View>
              <FormField
                maxLength={255}
                multiline
                name="address"
                numberOfLines={3}
                placeholder="العنوان"
              />
              <View style={{ marginVertical: 20 }}></View>
              <View style={styles.row}>
                <Picker
                  items={payMethod}
                  name="payMethod"
                  numberOfColumns={3}
                  PickerItemComponent={CategoryPickerItem}
                  placeholder="طريقة الدفع"
                  width="50%"
                />
                <DatePicker name="start_date" width="50%" />
              </View>

              <View style={styles.row}>
                <FormField
                  keyboardType="numeric"
                  name="installments_count"
                  placeholder="عدد الاقساط"
                  width="30%"
                  set={setCount}
                  row={true}
                />

                <FormField
                  keyboardType="numeric"
                  name="installment_amount"
                  placeholder="مبلغ القسط"
                  width="30%"
                  row={true}
                  set={setAmount}
                />
                <View
                  style={{
                    backgroundColor: defaultStyles.colors.light,
                    width: "44%",
                    borderRadius: 25,
                    padding: 15,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={[
                      defaultStyles.text,
                      { textAlign: "center", paddingLeft: 10 },
                      price
                        ? { color: defaultStyles.colors.dark }
                        : { color: defaultStyles.colors.medium },
                    ]}
                  >
                    سعر الجهاز
                    {price ? ":" + price : ""}
                  </Text>
                </View>
              </View>
              <SubmitButton title="تعديل الطلب" />
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  form: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row-reverse",
    gap: 8,
    marginVertical: 5,
  },
});
export default EditOrderScreen;
