import { StyleSheet, Dimensions} from 'react-native';
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    container: {
        backgroundColor: "#3777f0",
        padding: 0.02 * height,
        margin: 10,
        borderRadius: 15,
        marginTop: 0.05 * width,
        width: 0.75*width,
    },
    page:{
        flex: 1,
    },

    box:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'flex-end',
        marginBottom: width*0.15,
    },
    header: {
        marginTop: width*0.1,
        alignItems:'center',
        justifyContent:'space-between',
        height: height* 0.06,
        flexDirection: 'row',
        padding: 10,
    },
    messageBtn:{
        
        
    },

    leftContainer:{
        backgroundColor: '#3777f0',
        marginLeft: 10,
        marginRight: 'auto',
    },
    rightContainer:{
        backgroundColor: 'lightgrey',
        marginRight: 10,
        marginLeft: 'auto'
    },
    root:{
        flexDirection:'row',
        padding: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    inputContainer:{
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        flexDirection: 'row',
        borderColor: '#dedede',
        alignItems:'center',
    },
    buttonContainer:{
        width: 0.1 * width,
        height: 0.05 * height,
        backgroundColor: '#3777f0',
        borderRadius: 25,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText:{
        color: 'white',
        fontSize: width*0.08,
        marginLeft: width*0.025,
    },
})