import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list_ticket: {
        width: '100%',
        paddingHorizontal: 12,
    },
    list_ticket_container: {
        paddingTop: 12
    },
    ticket_item: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden'
    },
    // TOP
    ticket_top: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    ticket_top_clm: {
        justifyContent: "center",
        alignItems: "center"
    },
    ticket_top_clm_txt_1: {
        color: '#cbcbcb'
    },
    ticket_top_clm_txt_2: {
        fontSize: 17,
    },
    ticket_top_clm_txt_3: {
        fontSize: 15,
        color: '#747476'
    },
    // DECOR
    ticket_top_clm_decor: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ticket_dot_1: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#707072',
        overflow: 'hidden',
    },
    ticket_line: {
        width: 24,
        marginHorizontal: 4,
        height: 1,
        backgroundColor: '#d6d6d6'
    },
    ticket_dot_2: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2522cf',
        backgroundColor: '#2522cf',
        overflow: 'hidden',
    },
    ticket_time_distance: {
        fontSize: 15,
        color: '#747476',
        marginTop: 4,
    },
    // BOTTOM
    ticket_bottom: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 12,
    },
    ticket_bottom_item: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ticket_bottom_item_icon: {
        width: 24,
        height: 24,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e2e1ff',
        marginRight: 4,
        overflow: "hidden",
    },
    ticket_bottom_item_icon_txt: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#3330d3',
        fontStyle: 'italic'
    },
    ticket_bottom_item_txt: {
        color: '#707072'
    },
    // HIDDEN
    ticket_hidden: {
        marginTop: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    ticket_hidden_row: {
        fontSize: 16,
        color: '#707072',
        marginTop: 8,
    },
    ticket_hidden_value: {
        color: '#1f1f1f'
    },
    ticket_hidden_btn: {
        width: '100%',
        marginTop: 12,
        paddingVertical: 8,
        backgroundColor: '#e2e1ff',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        overflow: 'hidden'
    },
    ticket_hidden_btn_txt: {
        fontSize: 16,
        color: '#3330d3'
    }
})
export default styles