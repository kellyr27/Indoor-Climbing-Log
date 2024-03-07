import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from "../assets/svg";

const TickTypeIcon = ({ tickType, style }) => {
    const tickTypeIcons = {
        Flash: <FlashSVG style={style} />,
        Redpoint: <RedpointSVG style={style} />,
        Hangdog: <HangdogSVG style={style} />,
        Attempt: <AttemptSVG style={style} />,
    };

    return tickTypeIcons[tickType];
}

export default TickTypeIcon;