import { getCategoryConstants } from '../../actions/constants/constants'

const initialState = {
  categories: [],
  loading: false,
  error: null
}

function pushCategoryToList (parentId, categories, category) {
  let allCategories = []
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: []
      }
    ]
  }
  for (let cate of categories) {
    if (cate._id == parentId) {
      allCategories.push({
        ...cate,
        children: cate.children
          ? pushCategoryToList(
              parentId,
              [
                ...cate.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children
                }
              ],
              category
            )
          : []
      })
    } else {
      allCategories.push({
        ...cate,
        children: cate.children
          ? pushCategoryToList(parentId, cate.children, category)
          : []
      })
    }
  }
  return allCategories
}

export default function (state = initialState, action) {
  switch (action.type) {
    case getCategoryConstants.GET_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break
    case getCategoryConstants.ADD_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case getCategoryConstants.ADD_CATEGORIES_SUCCESS:
      const category = action.payload.category
      const updatedCategories = pushCategoryToList(
        category.parentId,
        state.categories,
        category
      )
      state = {
        ...state,
        categories: updatedCategories,
        loading: false
      }
      break
    case getCategoryConstants.GET_CATEGORIES_FAILURE:
      state = {
        ...initialState
      }
      break
  }
  return state
}
