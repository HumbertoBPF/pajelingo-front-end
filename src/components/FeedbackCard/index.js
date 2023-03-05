import AlertCard from "components/AlertCard";
import Button from "components/Button";

export default function FeedbackCard({ colorStyle, children, onClick=((event) => {}) }) {
    return (
        <>
            <AlertCard colorStyle={colorStyle} children={children}/>
            <Button 
                id="newWordButton" 
                colorStyle="success"
                type="button"
                onClick={(event) => onClick(event)}>New word</Button>
        </>
    );
}