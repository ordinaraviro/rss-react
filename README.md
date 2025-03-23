# React. Task #6 React Performance
## Install instructions:

```bash
1. git clone https://github.com/ordinaraviro/rss-react.git
2. git checkout performance
3. npm i
4. npm run dev
```
## Performance

### Initial render
* Committed at: 0.2s
* Render Duration: 92.8ms
* Interaction: initial app render

<details>
<summary>Screenshots</summary>

![Flame Graph](./public/1initialRenderFlamegraph.png)

![Ranked Chart](./public/2initialRenderRanked.png)
</details>

### Sort by region
* Committed at: 3.5s
* Render Duration: 6.6ms
* Interaction: change selected region

<details>
<summary>Screenshots</summary>

![Flame Graph](./public/3regionSortFlamegraph.png)

![Ranked Chart](./public/4regionSortRanked.png)
</details>

### Sort by population
* Committed at: 5.5s
* Render Duration: 4.9ms
* Interaction: change sort query

<details>
<summary>Screenshots</summary>

![Flame Graph](./public/5populationSortFlamegraph.png)

![Ranked Chart](./public/6populationSrtRanked.png)
</details>

### Search by letter 'c'
* Committed at: 3.9s
* Render Duration: 3.2ms
* Interaction: change search query

<details>
<summary>Screenshots</summary>

![Flame Graph](./public/7sortByCFlamegraph.png)

![Ranked Chart](./public/8sortByCRanked.png)
</details>

### Repeat search by letter 'c'
* Committed at: 1.5s
* Render Duration: 2.7ms
* Interaction: repeat the same search query

<details>
<summary>Screenshots</summary>

![Flame Graph](./public/9repeatSortByCFlamegraph.png)

![Ranked Chart](./public/10repeatSortByCRanked.png)
</details>
