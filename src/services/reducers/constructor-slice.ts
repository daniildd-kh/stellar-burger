import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface constructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}
const initialState: constructorState = {
  bun: null,
  ingredients: []
};

type movedIndex = {
  index: number,
  newIndex: number
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: (create) => ({
    addIngredient: create.preparedReducer(
      (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredient } };
      },
      (state, action: PayloadAction<TConstructorIngredient>) => {
        const newIngredient = action.payload;
        if (newIngredient.type === 'bun') {
          state.bun = newIngredient;
        } else {
          state.ingredients.push(newIngredient);
        }
      }
    ),
    removeIngredient: create.reducer<string>(
      (state, action) => {
          state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload)
      }
    ),
    moveIngredient: create.reducer<movedIndex>(
      (state, action) =>{
        const { index, newIndex } = action.payload;
        const movedIngredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(newIndex, 0, movedIngredient);
      }
    )
  })
});

export const { addIngredient, removeIngredient, moveIngredient} = constructorSlice.actions;
export default constructorSlice.reducer;
