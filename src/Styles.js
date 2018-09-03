import {StyleSheet} from 'react-native';

var colors = {
  background: "#3D2F40",
  textMain: "#F4BDFF",
  textSubtle: "#7A5F7F",
}
var fonts = {
  primary: "FredokaOne",
}
module.exports = {
  colors: colors,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 65,
    margin: 5,
    color: colors.textMain,
    // fontWeight: "bold",
    fontFamily: fonts.primary,
  },
  heading: {
    fontSize: 30,
    margin: 15,
    color: colors.textSubtle,
    fontFamily: fonts.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSubtle,
    fontFamily: fonts.primary,
  },
  center: {
    textAlign: "center",
  }
};
