import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from "../assets/svg";

const TickTypeIcon = ({ tickType }) => {
    const tickTypeIcons = {
        Flash: <FlashSVG />,
        Redpoint: <RedpointSVG />,
        Hangdog: <HangdogSVG />,
        Attempt: <AttemptSVG />,
    };

    return tickTypeIcons[tickType];
}

export default TickTypeIcon;