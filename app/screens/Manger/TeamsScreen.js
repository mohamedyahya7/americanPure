import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";

const TeamsScreen = ({ route }) => {
  const { teams } = route.params;
  console.log("teams", JSON.stringify(teams, null, 2));

  T = {
    id: 1,
    name: "first",
    sellers_count: 1,
    technicals_count: 1,
    sellers: [
      {
        id: 2,
        user_id: 3,
        team_id: 1,
        status: 1,
        created_at: "2024-10-27T22:05:10.000000Z",
        updated_at: "2024-10-27T22:05:10.000000Z",
        user: {
          id: 3,
          name: "محمد",
          phone: "01220910505",
          role: "2",
          created_by: 0,
          email: "mohamed007yahya@gmail.com",
          email_verified_at: "2024-11-01T13:03:01.000000Z",
          created_at: "2024-10-27T22:05:10.000000Z",
          updated_at: "2024-10-27T22:05:10.000000Z",
        },
      },
    ],
    technicals: [
      {
        id: 1,
        user_id: 4,
        team_id: 1,
        status: 1,
        created_at: "2024-10-27T22:32:33.000000Z",
        updated_at: "2024-10-27T22:32:33.000000Z",
        user: {
          id: 4,
          name: "احمد",
          phone: "01220910404",
          role: "3",
          created_by: 0,
          email: null,
          email_verified_at: null,
          created_at: "2024-10-27T22:32:33.000000Z",
          updated_at: "2024-10-27T22:32:33.000000Z",
        },
      },
    ],
  };
  return (
    <View style={{ padding: 30 }}>
      {teams.map((team) => (
        <View style={styles.team} key={team.id}>
          <Text>{team.name}</Text>
          <View style={styles.teamInfo}>
            <View style={{padding:10}}>
              <Text>عدد المسوقين : {team.sellers_count}</Text>
              <View style={styles.teamMembers}>
                {team.sellers.map((seller) => (
                  <Text key={seller.id}>{seller.user.name}</Text>
                ))}
              </View>
            </View>
            <View style={{padding:10}}>
              <Text>عدد الفانين : {team.technicals_count}</Text>
              <View style={styles.teamMembers}>
                {team.technicals.map((technical) => (
                  <Text key={technical.id}>{technical.user.name}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  team: {
    alignItems: "center",
    justifyContent: "center",
    padding: 19,
    borderWidth: 1,
    margin: 20,
    borderColor: colors.primary,
    borderRadius: 10,
  },

  teamInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamMembers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
