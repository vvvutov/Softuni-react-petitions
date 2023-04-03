import './search.css'
import '../Catalog/catalog.css'


export const Search = () => {
    return (
        <section className="petition-search">
            <form className="search-form" action="#" method="">
                <input
                    type="text"
                    className="search-petition"
                    name=""
                    placeholder="Search here..."
                />
                <select id="category" name="category">
                            <option value="none" selected disabled hidden>Изберете категория</option>
                            <option value="ecology">Екология</option>
                            <option value="social">Социална тематика</option>
                            <option value="politics">Политика</option>
                            <option value="charity">Благотворителност</option>
                            <option value="other">Друго...</option>
                        </select>
                <button type="submit" className="btn-search">
                    Search
                </button>
            </form>
        </section>
    )
};