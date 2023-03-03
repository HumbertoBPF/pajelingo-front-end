import Button from "components/Button";

export default function FeedbackCard({ colorStyle, children, onClick=((event) => {}) }) {
    return (
        <div className="text-center">
            <div className={`alert alert-${colorStyle}`}>{children}</div>
            <Button 
                id="newWordButton" 
                colorStyle="success"
                type="button"
                onClick={(event) => onClick(event)}>New word</Button>
        </div>
    );
}