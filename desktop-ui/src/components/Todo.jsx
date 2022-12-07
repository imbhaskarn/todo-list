import { Trash2 } from "react-feather";

const Todo = () => {
  return (
    <div className="flex justify-between items-center p-6 lg:w-1/2 md:w-3/4">
      <div class="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-transparent outline-0  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div> <span className="text-center text-lg relative m-auto ml-0"> 26/11/2022 </span> content</div>
      <div>
        <Trash2 size={40} />
      </div>
    </div>
  );
};
export default Todo;
