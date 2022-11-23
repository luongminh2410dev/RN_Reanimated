import { StyleSheet } from "react-native";
import Metrics from "../../../../utils/metrics";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
        paddingTop: Metrics.STATUS_BAR_HEIGHT
    },
    linear_gradient: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 400,
        height: 400,
    },
    header: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: Metrics.HOME_MARGIN_ITEM,
        paddingHorizontal: Metrics.HOME_MARGIN_ITEM,
    },
    header_title: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500'
    },
    // body
    body: {
        flex: 1,
        marginTop: Metrics.HOME_MARGIN_ITEM * 2,
        paddingHorizontal: Metrics.HOME_MARGIN_ITEM,
    },
    connection: {
        flex: 1.2,
        width: '100%',
        justifyContent: 'space-between',
        padding: 24,
        backgroundColor: '#282828',
        borderRadius: 24,
        overflow: 'hidden'
    },
    connection_info: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },
    connection_detail: {
        flex: 1,
    },
    connection_icon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 14,
        overflow: "hidden"
    },
    connection_name: {
        fontSize: 22,
        color: 'white',
        fontWeight: '500'
    },
    connection_ip: {
        marginTop: 2,
        color: '#838383'
    },
    connection_state: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    connection_state_txt: {
        fontSize: 15,
    },
    connection_state_timming: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    connection_state_countup: {
        marginRight: 8,
        color: '#fefefe',
        fontSize: 15,
    },
    signal: {
        width: 14,
        marginTop: -2,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: "row",
    },
    // 
    signal_detail: {
        flex: 2.8,
        width: '100%',
        marginTop: 12,
        justifyContent: 'space-between',
        paddingTop: 24,
        backgroundColor: '#282828',
        borderRadius: 24,
        overflow: 'hidden'
    },
    time_delay: {
        paddingHorizontal: 24,
        fontSize: 15,
        color: '#a5a2a6',
        fontWeight: '500'
    },
    signal_absolute: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 24,
    },
    signal_cursor: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 12,
    },
    box: {
        flex: 1,
        height: (Metrics.DEVICE_WIDTH - Metrics.HOME_MARGIN_ITEM * 3) / 2.5,
        padding: 24,
        backgroundColor: '#282828',
        borderRadius: 24,
    },
    box_name: {
        flexDirection: "row",
        alignItems: "center"
    },
    box_name_txt: {
        fontSize: 15,
        color: '#a5a2a6',
        fontWeight: '500',
        marginRight: 8,
    },
    box_value: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    box_value_txt: {
        fontSize: 24,
        fontWeight: '500',
        color: '#fefefe'
    },
    // handle bar
    handle_bar_container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: Metrics.getSafeAreaInsets().bottom
    },
    handle_bar: {
        width: '100%',
        padding: 8,
        flexDirection: "row",
        borderRadius: 16,
        backgroundColor: 'rgba(60,60,60, 0.6)',
        overflow: "hidden"
    },
    local_btn: {
        width: 64,
        height: 64,
        borderRadius: 16,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(79,79,79,0.9)'
    },
    connect_btn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 2,
    },
    connect_btn_txt: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12
    }
})
export default styles