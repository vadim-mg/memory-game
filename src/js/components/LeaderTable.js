import '@/scss/components/_leaderTable.scss'
const LS_KEY = 'ls-leader-table'

export class LeadersTable {
    #data
    #element
    constructor() {
        const raw = localStorage.getItem(LS_KEY)
        this.#data = raw ? JSON.parse(raw) : []
        this.#render()
    }

    #render() {
        this.#element = document.createElement('table');
        this.#element.classList.add('leader-table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Место', 'Ходы', 'Дата'];
        for (const text of headers) {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.append(th);
        }
        thead.append(headerRow);

        const tbody = document.createElement('tbody');

        if (this.#data.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;
            td.textContent = 'Пока нет результатов';
            tr.append(td);
            tbody.append(tr);
        } else {
            const top = [...this.#data]
                .sort((a, b) => a.movesCount - b.movesCount)
                .slice(0, 10);

            top.forEach((row, index) => {
                const tr = document.createElement('tr');

                const rowData = [
                    index + 1,
                    row.movesCount,
                    new Date(row.timeStamp).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }),
                ];
                for (const text of rowData) {
                    const td = document.createElement('td');
                    td.textContent = text;
                    tr.append(td);
                }
                tbody.append(tr);
            });
        }

        this.#element.append(thead, tbody);
    }

    get element() {
        this.#render()
        return this.#element
    }

    get tableSize() {
        return this.#data.length
    }

    pushResult(movesCount) {
        const dataRow = {
            movesCount,
            timeStamp: Date.now(),
        }
        console.log(dataRow)
        this.#data.push(dataRow)
        localStorage.setItem(LS_KEY, JSON.stringify(this.#data));
    }
}