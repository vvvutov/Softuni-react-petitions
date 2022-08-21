import './details.css'

export const Details = () => {
     return(
        <main>
        <section id="details-info">
          <h1>Details</h1>
          <div className="petition-image">
            <img src="image"  alt="alt"/>
          </div>
          <div className="petition-info">
            <div className="petition-text">
              <h1 id="name">petition</h1>
              <h3 id="payment">category</h3>
              <p id="summary">
                <span>summary</span>
              </p>
              <p id="description">
               description
              </p>
            </div>
            <div className="product-btn">
              {/* <div class="author">
                        <a href="#" class="btn-edit">Edit</a>
                        <a href="#" class="btn-delete">Delete</a>
                    </div> */}
              {/* <a href="#" class="btn-sign">sign</a> */}
              
            </div>
          </div>
        </section>
      </main>
      
     )
};