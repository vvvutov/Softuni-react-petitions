import './catalog.css'

export const CatalogPetitionItem = () => {
    return (
        <div className="petition">
            <div className="petition-img">
                <img src="image" alt='alt' />
            </div>
            <div className="petition-info">
                <h1>Petition title</h1>
                <p>
                    <span>Category</span>something
                </p>
                <p>
                    Petition summary
                </p>
            </div>
            <a href="/details" className="btn-details">
                Details
            </a>
        </div>

    )
};