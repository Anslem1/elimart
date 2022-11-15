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
        pagetype: category.pagetype,
        children: []
      }
    ]
  }
  for (let cate of categories) {
    if (cate._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        pagetype: category.pagetype,
        children: []
      }
      allCategories.push({
        ...cate,
        children:
          cate.children.length > 0
            ? [...cate.children, newCategory]
            : [newCategory]
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
    case getCategoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case getCategoryConstants.ADD_CATEGORY_SUCCESS:
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
        ...initialState,
        loading: false,
        error: action.payload.error
      }
      break
    case getCategoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case getCategoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break
    case getCategoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...initialState,
        error: action.payload.error,
        loading: false
      }
      break
    case getCategoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case getCategoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false
      }
      break
    case getCategoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break
  }

  return state
}
