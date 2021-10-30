import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    form:{
        backgroundColor: "#FFC0CB",
    },
    card:{
        marginTop: 150,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
    },
    container:{
        marginTop: 100,
    },
    profilePicContainer:{
        zIndex: 100,
        position: "absolute",
        marginTop: 50,
        marginHorizontal: 80,
    },
    profilePic:{
        height: 200,
        width: 200,
    },
    submitBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
        alignSelf: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    inputView: {
        width: "85%",
        height: 45,
        marginBottom: 20,
        marginTop: 25,
        alignSelf: "center",
    },
})