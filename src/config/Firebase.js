import RNFirebase from 'react-native-firebase'
const firebase = new RNFirebase({
    debug:true,
    persistence:true
});
export default firebase;