

export const Filter = ({ options, activeFilter, changeFilter, title }) => {
    return (
        <div className="filter">
            <span className="filterTitle">{`${title} : `} </span>
            {
                options.map(option => (
                    <div className={activeFilter === option ? "activeFilter" : "filterOption"}
                        onClick={() => changeFilter(option)}>
                        {option}
                    </div>
                ))
            }
        </div>
    )
}
