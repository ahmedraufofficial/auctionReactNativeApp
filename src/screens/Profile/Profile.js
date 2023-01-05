import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import CustomButton from '../../components/CustomButton';

const Profile = ({navigation}) => {
  const {userInfo, logout, isLoading} = useContext(AuthContext);
  return (
    <View style={styles.root}>
      <DataTable>
        <DataTable.Header>
          <Text style={styles.header}>Profile</Text>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Email</DataTable.Cell>
          <DataTable.Cell>{userInfo?.email}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Username</DataTable.Cell>
          <DataTable.Cell>{userInfo?.username}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Status</DataTable.Cell>
          <DataTable.Cell>{userInfo?.status}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <CustomButton
          onPress={() => navigation.navigate('ChangePassword')}
          text="Change Password"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    width: "100%",
  }
})

export default Profile