import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginFooter from "./_components/LoginFooter";

import LoginBody from "./_components/LoginBody";
import LoginHeader from "./_components/LoginHeader";

export default function Login() {
  return (
    <>
      <StatusBar barStyle='dark-content' />

      <SafeAreaView className='flex-1 bg-gray-50'>
        <ScrollView>
          <LoginHeader />
          <LoginBody />
        </ScrollView>
      </SafeAreaView>

      <LoginFooter />
    </>
  );
}
