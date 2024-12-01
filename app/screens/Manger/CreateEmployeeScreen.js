//createEmployee
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { View, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  Form, ErrorMessage,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../components/forms";
import CategoryPickerItem from "../../components/CategoryPickerItem";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import { createEmployee, getTeams } from "../../api/managerService";
import colors from "../../config/colors";

const apiUrl = "http://127.0.0.1:8000/api/v1";


const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().min(1).label("الاسم"),
  last_name: Yup.string().required().min(1).label("الاسم"),
  phone: Yup.string().required().min(11).max(11).matches(/^\d+$/).label("رقم الهاتف"),
  phone2: Yup.string().required().min(11).max(11).matches(/^\d+$/).label("رقم الهاتف"),
  nationalId: Yup.string().required().min(14).max(14).matches(/^\d+$/).label("الرقم القومي"),
  role: Yup.object().required().label("الوظيفة"),
  team_id: Yup.object().required().label("الفريق"),
});

async function getTeamsData(setTeams) {
  try {
    const response = await getTeams();
    setTeams(response.data.map((t) => ({ label: t.name, value: t.id, backgroundColor: colors.primary, icon: "account-group" })));
  }
  catch (error) {
    console.log(error);
  }
}
const roles = [
  { label: "مسوق", value: 2, icon: "shopping-outline", backgroundColor: '#0af7d5' },
  { label: "فني", value: 3, icon: "wrench-outline", backgroundColor: '#555' },
  { label: "محصل", value: 4, icon: "cash", backgroundColor: 'green' },
  { label: "خدمة عملاء", value: 5, icon: "phone-outline", backgroundColor: '#fc5c65' },
];

function CreateEmployeeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [teams, setTeams] = useState([]);

  
  useEffect(() => { getTeamsData(setTeams) }, [])

  const handleSubmit = async (employee, { resetForm }) => {
    console.log('from submit')
    setLoading(true);
    // employee.status = employee.status ? 1 : 0;
    employee.role = employee.role.value;
    employee.team_id = employee.team_id.value;
    try{
      const result = await createEmployee(employee);
      resetForm();
    }
    catch(error){
      setError(true)
      setErrorMessage(error.message)
    }
    
    setLoading(false);
  };

  
  return (<Screen style={{
    padding: 5, 
    flex: 1,
      flexGrow: 1,
      alignItems: 'center',
      height:'100%',
      justifyContent: 'space-between'
    }}>
      <ActivityIndicator visible={loading} />
      <ScrollView >
        <Image source={require('../../assets/logo-red.png')} 
        style={{ width: 150, height: 150, marginVertical: 100, display: 'flex', alignSelf: 'center', justifyContent: 'center'}} />
          <Form
            initialValues={{
              first_name: "",
              last_name: "",
              phone: "",
              phone2: "",
              nationalId: "",
              role: null,
              team_id: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={errorMessage} visible={error} />
            <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
              <FormField
                autoCorrect={false}
                name="first_name"
                placeholder="الاسم الاول"
                row={true}
                width='35%'
              />
              <FormField
                autoCorrect={false}
                name="last_name"
                placeholder=" باقي الاسم"
                row={true}
                width='62%'
              />
                </View>
                <FormField
                  autoCorrect={false}
                  name="nationalId"
                  keyboardType="numeric"
                  maxLength={14}
                  placeholder="الرقم القومي"
                  row={true}
                  width='50%'
                />
                <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
                  
              <FormField
                autoCorrect={false}
                name="phone"
                keyboardType="numeric"
                maxLength={11}
                placeholder="رقم الهاتف"
                row={true}
              />
              <FormField
                autoCorrect={false}
                name="phone2"
                keyboardType="numeric"
                maxLength={11}
                placeholder="رقم الهاتف"
                row={true}
              />
            </View>
            <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
              <Picker
                items={teams}
                name="team_id"
                numberOfColumns={3}
                PickerItemComponent={CategoryPickerItem}
                placeholder="الفريق"
                width='50%'
              />
              <Picker
                items={roles}
                name="role"
                numberOfColumns={3}
                PickerItemComponent={CategoryPickerItem}
                placeholder="الوظيفة"
                width='50%'
              />
            </View>
              <SubmitButton title="اضافة" />
            {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
            </View> */}

          </Form>
      </ScrollView>
    </Screen>)
  
    ;
}


export default CreateEmployeeScreen;
