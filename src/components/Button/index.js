export default function Button({ id, colorStyle, type, children, onClick=((event) => {}) }) {
    return (
        <div className="text-center">
            <button id={id} className={`btn btn-${colorStyle}`} type={type} onClick={
                (event) => onClick(event)
            }>{children}</button>
        </div>
    );
}