export default function ServerNotFound() {
  return (
    <>
      <style>{`
      .page_404 {
      padding: 40px 0;
      background: #fff;
      font-family: 'Arvo', serif;
  }

  .page_404 img {
      width: 100%;
  }

  .four_zero_four_bg {
      background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
      height: 400px;
      background-position: center;
  }

  .four_zero_four_bg h1 {
      font-size: 80px;
  }

  .four_zero_four_bg h3 {
      font-size: 80px;
  }

  .link_404 {
      color: #fff !important;
      padding: 10px 20px;
      background: #39ac31;
      margin: 20px 0;
      display: inline-block;
  }

  .contant_box_404 {
      margin-top: -50px;
  }
    .text-colo-black{
      color:black
    }
`}</style>

      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1
                    className="text-center"
                    style={{
                      color: "black",
                    }}
                  >
                    404
                  </h1>
                </div>
                <div
                  className="contant_box_404"
                  style={{
                    color: "black",
                  }}
                >
                  <h3 className="font-bold">Server Not Found</h3>
                  <div className="error-desc">
                    Sorry, but the page you are looking for has note been found.
                    Try checking the URL for error, then hit the refresh button
                    on your browser or try found something else in our app.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="middle-box text-center animated fadeInDown"></div>
    </>
  );
}
