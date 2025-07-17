// 渲染商品卡片的函式：接收 product 資料，回傳一個 <li> 商品卡片元素
const renderProducts = (product) =>
  $(`
    <li class="card">
      <a href="./productDetail.html">
      <div class="card-img">
        <img src="${product["main-image"]}" alt="${product.name}">
      </div>
      <div class="card-content">
        <h3 class="card-title h6">${product.name}</h3>
        <p class="label-md">NT$${addComma(product.price)}</p>
      </div>
      </a>
    </li>
  `);
// 渲染商品詳情頁的函式
const renderProductDetail = (products, maybeLike) => {
  const product = products[0];
  console.log(maybeLike);
  return $(`
        <section class="productInfo">
          <section class="productInfo-gallery">
            <ul class="gallery-grid">
              ${product.images
                .map(
                  (image) => `
        <li class="gallery-grid-img">
          <img src="${image}" alt="商品圖" />
        </li>
      `
                )
                .join("")}
            </ul>
          </section>
          <section class="productInfo-content">
            <!--breadcrumb-->
            <nav class="breadcrumb mb-12">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="＃">首頁</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="＃">女鞋</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="＃">滑板鞋</a>
                </li>
                <li class="breadcrumb-item">
                  <a class="active" href="＃">${product.name}</a>
                </li>
              </ol>
            </nav>
            <!--title-->
            <h2 class="h2 mb-16">${product.name}</h2>
            <!--price-->
            <p class="mb-16">
              <span class="price h5">NT$${addComma(product.price)}</span>
              <span class="original-price paragraph-sm">NT$${addComma(
                product.originalPrice
              )}</span>
            </p>
            <article class="introduction mb-32">
              ${product.description
                .map(
                  (content) => `
              <p class="introduction-content paragraph-md mb-12">
                ${content}
              </p>
            `
                )
                .join("")}
            </article>
            <fieldset class="product-colors mb-32">
              <legend class="paragraph-md">顏色</legend>
              <div class="color-options-wrap">
                ${product.colors
                  .map(
                    (color) => `
              <label class="color-option">
                  <input type="radio" name="color" value="red" />
                  <img src="${color.image}" alt="${color.name}" />
                  <span class="label-md color-name">${color.name}</span>
                </label>
            `
                  )
                  .join("")}
              </div>
            </fieldset>
            <!--size-->
            <fieldset class="product-sizes mb-48">
              <legend class="paragraph-md mb-8">尺寸</legend>
              <div class="size-options-wrap mb-8">
               ${product.sizes
                 .map(
                   (size, index) => `
    <label class="size-option">
      <input type="radio" name="size" value="${size}" ${
                     index === 7 || index === 8 ? "disabled" : ""
                   } />
      <span class="size-label">${size}</span>
    </label>
  `
                 )
                 .join("")}
              </div>
              <p class="paragraph-sm size-options-count">僅剩 "${
                product.count
              }" 雙</p>
            </fieldset>
            <!--size-->
            <!--button-->
            <div class="btn-wrapper mb-32">
              <a
                class="btn addFavorite pure-button-outline-neutral label-md"
                href="#"
                ><i class="btn-icon bi bi-heart"></i>
                <span class="favText">加入收藏</span></a
              >
              <a class="btn pure-button-fill-neutral" href="#"
                ><i class="btn-icon bi bi-bag-fill"></i> 門市預約或試穿</a
              >
            </div>
            <!--button-->
            <!--notice-->
            <section class="product-notice-wrap">
              <h2 class="notice-title">注意事項</h2>

              <div class="notice-item">
                <h3 class="notice-subtitle">商品材質</h3>
                ${product.meterials
                  .map(
                    (meterial) => `
      <p class="notice-content paragraph-md">
        ${meterial}
      </p>
    `
                  )
                  .join("")}
              </div>
              <div class="notice-item">
                <h3 class="notice-subtitle">購買須知</h3>
                 ${product.notices
                   .map(
                     (notice) => `
      <p class="notice-content paragraph-md">
        ${notice}
      </p>
    `
                   )
                   .join("")}
              </div>
              <div class="notice-item">
                <h3 class="notice-subtitle">保養方式</h3>
                ${product.Cares.map(
                  (Care) => `
      <p class="notice-content paragraph-md">
        ${Care}
      </p>
    `
                ).join("")}

              </div>
            </section>
          </section>
        </section>

        <!-- 下半部：你可能喜歡 -->
        <section class="product-recommendation">
          <h2 class="heading-h2 mb-16">你可能也喜歡...</h2>
          <ul class="recommendation-list">
          ${maybeLike
            .map(
              (product) => `
            <li class="card">
              <div class="card-img">
                <img src="${product["main-image"]}" alt="${product.name}" />
              </div>
              <div class="card-content">
                <h3 class="card-title h6">${product.name}</h3>
                <p class="label-md">NT$${addComma(product.price)}</p>
              </div>
            </li>
            `
            )
            .join("")}

          </ul>
        </section>
    `);
};
// 根據網頁名稱對應渲染函式與容器的設定物件
const renderMap = {
  "product.html": {
    renderFn: renderProducts,
    container: ".card-list",
  },
  "productDetail.html": {
    renderFn: renderProductDetail,
    container: ".productInfo-wrap",
  },
};
// 取得目前網頁的網址路徑
const pathname = window.location.pathname;
// 從 renderMap 中找出符合當前頁面的設定（判斷檔名是否有包含）
const page = Object.keys(renderMap).find((p) => pathname.endsWith(p));
// 如果找到了對應頁面
if (page) {
  //從renderMap解構出兩個屬性並分別存在變數 renderFn 和 container
  const { renderFn, container } = renderMap[page];
  //jquery物件 container
  const $container = $(container);
  // 使用 axios 取得 products.json 裡的商品資料
  axios
    .get("./js/products.json")
    .then((response) => {
      // 取得資料陣列
      const products = response.data.products;
      const maybeLike = response.data.maybeLike;
      console.log(products, maybeLike);

      switch (page) {
        case "product.html":
          // 逐筆資料跑迴圈，把每筆商品渲染成 HTML，並加到對應容器中
          products.forEach((product) => {
            // 使用jquery物件 container 的append方法來渲染商品卡片
            $container.append(renderFn(product));
          });
          break;

        case "productDetail.html":
          // 逐筆資料跑迴圈，把每筆商品渲染成 HTML，並加到對應容器中
          // 使用jquery物件 container 的append方法來渲染商品卡片
          $container.append(renderFn(products, maybeLike));
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      // 如果抓資料失敗，輸出錯誤訊息
      console.error("讀取 products.json 發生錯誤", error);
    });
}

//收藏按鈕
$(document).on("click", ".addFavorite", function (e) {
  e.preventDefault();
  const $icon = $(this).find("i");
  const $text = $(this).find(".favText");
  $icon.toggleClass("bi-heart bi-heart-fill");
  $text.text($text.text() === "加入收藏" ? "已收藏" : "加入收藏");
});

function addComma(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
