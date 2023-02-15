import { A } from "@expo/html-elements";
import { CenteredContainer } from "../elements/styles";
import { Image, Platform } from "react-native"
import { useEffect, useState } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}


export function DownloadBanner() {
    if (Platform.OS !== "web") {
        return null;
    }
    const { width, height } = useWindowDimensions();
    if (width < height) {
        return null;
    }
    return <CenteredContainer style={{ height: 100, width: '100%', flexDirection: 'row' }}>
        <A href='https://apps.apple.com/us/app/is-it-shabbat/id1435157805?itsct=apps_box_badge&amp;itscg=30200'><Image source={require('./ios-banner.svg')} style={{ width: 126, height: 42 }} /></A>
        <A href='https://play.google.com/store/apps/details?id=com.ounceofsilver.isitshabbat&pli=1'><Image source={require('./google-play-badge.png')} style={{ width: 646 / 4, height: 250 / 4 }} /></A>
    </CenteredContainer>
}