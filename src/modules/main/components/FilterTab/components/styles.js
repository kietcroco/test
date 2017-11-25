import { sizes, fontSizes, scale } from '~/configs/styles';

export default {
    container: {
        marginVertical: sizes.margin
    },
    label: {
        fontSize: fontSizes.normal,
        fontWeight: "bold"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: sizes.spacing
    },
    description: {
        fontSize: fontSizes.normal,
        width: 40 * scale
    },
    input: {
        flex: 1
    },
    checkboxRow: {
        flexDirection: "row",
        marginTop: sizes.spacing
    },
    checkboxLabel: {
        fontSize: fontSizes.normal,
        marginLeft: sizes.spacing
    }
};