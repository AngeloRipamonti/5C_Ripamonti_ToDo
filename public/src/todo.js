export function toDoList(parentElement) {
    let todos = [];

    return {
        render: function () {
            let html = ``;
            html += todos.map((e) => {
                if(!e.completed)
                    return `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                `+ e.todo +`
                            </td>
                            <td class="px-6 py-4">
                                <button type="button" class="completeButton text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Complete</button>
                            </td>
                            <td class="px-6 py-4">
                                <button type="button" class="deleteButton text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                            </td>
                        </tr>`;
                else
                return `<tr class="bg-gray-400 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                `+ e.todo +`
                            </td>
                            <td class="px-6 py-4">
                                <button type="button" class="completeButton text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Complete</button>
                            </td>
                            <td class="px-6 py-4">
                                <button type="button" class="deleteButton text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                            </td>
                        </tr>`;
            })
            parentElement.innerHTML = html;

            document.querySelectorAll(".completeButton").forEach((button) => {
                button.onclick = () => {

                };
            });

            document.querySelectorAll(".deleteButton").forEach((button) => {
                button.onclick = () => {

                };
            });
        },

        send: async function (todo) {
            try {
                const response = await fetch("/todo/add", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(todo)
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        load: async function () {
            try {
                const response = await fetch("/todo");
                const json = await response.json();
                todos = json.todos;
                this.render();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        complete: async function (todo) {
            try {
                const response = await fetch("/todo/complete", {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(todo)
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        },

        delete: async function (id) {
            try {
                const response = await fetch("/todo/" + id, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const json = await response.json();
                return json;
            }
            catch (error) {
                throw error;
            }
        }
    }
} 