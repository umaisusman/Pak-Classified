// src/pages/CategoryPage/useCategoryPage.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../redux/thunks/categoryThunks";

const useCategoryPage = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return { categories, status };
};

export default useCategoryPage;
