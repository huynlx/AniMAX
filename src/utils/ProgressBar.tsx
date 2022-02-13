import ProgressBar from "react-topbar-progress-indicator";

ProgressBar.config({
    barColors: {
        "0": "#ff0000",
    },
});

const ProgressBarLoading = () => {
    return <ProgressBar />;
};

export default ProgressBarLoading;