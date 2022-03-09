import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    //Top header tab
    mainView: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    backBtn: {
        position: 'absolute',
        flex: 1,
    },
    pageTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerCard:{
        paddingTop: 35,
        height: 85,
    },

    //Question display
    question: {
        alignSelf: "center",
        fontSize: 20,
        // fontFamily: "PublicSans_500Medium",
    },

    //Answers
    answerCard: {
        marginVertical: 10,
    },

    leftAction:{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fc0303',
    },

    rightAction:{
        justifyContent: 'center',
        backgroundColor: '#49a300',
        flex: 1,
        alignItems: 'flex-end',
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }


})