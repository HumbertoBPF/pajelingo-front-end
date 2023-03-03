export default function PaginationButton({ page=null, active=false, children, callback=((page) => {}) }) {
    
    return (
        <li className={`page-item${active?" active":""}`} onClick={() => {
            if (page !== null) {
                callback(page);
            }
        }}>
            <a className="page-link" href="#" >
                <span>{children}</span>
            </a>
        </li>
    )
}