import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },
    background: {
        height: width / 0.676,
        width: width,
    },
    background_image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: width,
        height: width / 0.676,
    },
    list_film: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    list_film_container: {
        paddingRight: 64,
    },
    film_item: {
        width: width * 0.7,
        alignSelf: "center",
        marginLeft: 32,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 48,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    film_img: {
        width: '100%',
        height: 350,
        borderRadius: 8,
        marginBottom: 12,
    },
    film_name: {
        fontSize: 24,
    },
    // FILM TYPE
    film_type: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "center",
        marginTop: 12
    },
    film_type_item: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 100,
        overflow: "hidden"
    },
    film_type_item_txt: {
        color: '#747476',
    },
    // FILM RATING 
    film_rating: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 12,
    },
    film_rating_point: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'black'
    },
    film_rating_star: {
        flexDirection: "row",
        marginLeft: 8
    },
    star_icon: {
        marginRight: 4,
    },
    // HIDDENT CONTENT
    list_actor: {
        marginTop: 12,
        width: '100%',
        flexDirection: "row",
    },
    actor_item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actor_image: {
        width: 76,
        height: 76,
        borderRadius: 4,
        overflow: "hidden"
    },
    actor_name: {
        marginTop: 4,
        fontWeight: "500"
    },
    film_discription: {
        marginTop: 12,
        width: '90%',
        alignSelf: "center",
        color: '#747476',
        overflow: "hidden"
    },
    // BUTTON
    film_button: {
        position: 'relative',
        marginTop: 12,
        width: '90%',
        height: 46,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#181818',
        borderRadius: 8,
        overflow: "hidden"
    },
    film_button_txt: {
        fontSize: 17,
        textAlignVertical: "center",
        textAlign: "center",
        color: 'white'
    },
    film_button_txt_absolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default styles