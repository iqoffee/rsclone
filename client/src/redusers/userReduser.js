export const initialState = null

export const reduser = (state, action) => {
  if (action.type) {
    return action.payload
  }
  // if(action.type === "CLEAR"){
  //   return null
  // }
  return state
}