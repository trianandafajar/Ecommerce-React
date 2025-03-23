import * as React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
  SideNav, 
  LayoutSidebar,
  Responsive, 
  CardProduct,
  Pagination,
  InputText,
  Pill 
} from 'upkit';
import BounceLoader from 'react-spinners/BounceLoader';
import { useNavigate } from 'react-router-dom'; // Ganti useHistory dengan useNavigate

import TopBar from '../../components/TopBar';
import menus from './menus';
import { config } from '../../config';
import {
  fetchProducts, 
  setPage, 
  goToNextPage, 
  goToPrevPage,
  setKeyword,
  setCategory,
  toggleTag,
} from '../../features/Products/actions';
import Cart from '../../components/Cart';
import { tags } from './tags';
import { addItem, removeItem } from '../../features/Cart/actions';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, products.currentPage, products.keyword, products.category, products.tags]);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav 
            items={menus} 
            verticalAlign="top" 
            active={products.category}
            onChange={category => dispatch(setCategory(category))}
          />
        }
        content={
          <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">

            {/* KONTEN PRODUK */}
            <div className="w-full md:w-3/4 pl-5 pb-10">
              <TopBar/>
              
              {/* Input Pencarian */}
              <div className="w-full text-center mb-10 mt-5">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="Cari makanan favoritmu..."
                  fitContainer
                  onChange={e => dispatch(setKeyword(e.target.value))}
                />
              </div>

              {/* Filter Tags */}
              <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                {tags[products.category]?.map((tag, index) => (
                  <div key={index}>
                    <Pill
                      text={tag}
                      icon={tag.slice(0,1).toUpperCase()}
                      isActive={products.tags.includes(tag)}
                      onClick={() => dispatch(toggleTag(tag))}
                    />
                  </div>
                ))}
              </div>

              {/* Loading State */}
              {products.status === 'process' && !products.data.length && (
                <div className="flex justify-center">
                  <BounceLoader color="red"/> 
                </div>
              )}

              {/* Daftar Produk */}
              <Responsive desktop={3} items="stretch">
                {products.data.map((product, index) => (
                  <div key={index} className="p-2">
                    <CardProduct
                      title={product.name}
                      imgUrl={`${config.api_host}/upload/${product.image_url}`}
                      price={product.price}
                      onAddToCart={() => dispatch(addItem(product))}
                    />
                  </div>
                ))}
              </Responsive>

              {/* Pagination */}
              <div className="text-center my-10">
                <Pagination 
                  totalItems={products.totalItems} 
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={page => dispatch(setPage(page))}
                  onNext={() => dispatch(goToNextPage())}
                  onPrev={() => dispatch(goToPrevPage())}
                />
              </div>

            </div>

            {/* SIDEBAR KERANJANG */}
            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
              <Cart 
                items={cart}
                onItemInc={item => dispatch(addItem(item))}
                onItemDec={item => dispatch(removeItem(item))}
                onCheckout={() => navigate('/checkout')} // Gunakan navigate
              />
            </div>

          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}
