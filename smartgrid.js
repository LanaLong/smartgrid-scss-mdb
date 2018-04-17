module.exports = {
    outputStyle: 'scss',
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: "1140px",
        fields: "30px"
    },
    breakPoints: {
        xl: {
            width: "1140px",
            fields: "30px"
        },

        lg: {
            width: "991px",
            fields: "30px"
        },
        md: {
            width: "768px",
            fields: "20px"
        },
        sm: {
            width: "540px",
            fields: "15px"
        },
        xs: {
            width: "400px",
            fields: "5px",
            offset: "10px"
        }
    }
};