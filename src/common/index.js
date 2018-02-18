import { AsyncStorage } from 'react-native';

export async function isLogin() {
  const session = await AsyncStorage.getItem("session_ticket");
  if (session != null) { return true; }
  return false;
}

export async function setSessionTicket(ticket) { // giriş yapınca gelen değeri kayıt ediyoruz
  await AsyncStorage.setItem("session_ticket", ticket);
}

export async function logOut() {
  await AsyncStorage.removeItem('session_ticket');
}

export async function getSessim() {
  console.log(await AsyncStorage.getItem("session_ticket"));
  const value = await AsyncStorage.getItem("session_ticket");
  return value;
  // await AsyncStorage.getItem("session_ticket").then(value => value).done();
}
