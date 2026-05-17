# WeekendSZ / 深圳周末去哪玩

`WeekendSZ` 是一个 H5 优先、后续可迁移微信小程序的 `uni-app` MVP。首版实现了深圳周末活动地图、景点/商场详情、活动详情、脱敏评价弹窗和内容运营台。

## 功能

- 首页手绘深圳地图：`src/assets/map/shenzhen-handdrawn-map.png`
- 24 个首版深圳核心点位：商场、景区、公园、集市、亲子和滨海场景
- 地图筛选：区域、类型、人群、活动状态、关键词
- 三层详情：地点详情 -> 活动详情 -> 评价弹窗
- 运营后台：一行一个公众号/地点名称导入，生成采集源和审核池
- Fastify API 骨架：地点、活动、评价、采集源导入、草稿审核

## 本地运行

```bash
npm install
npm run dev:h5
```

后端 API：

```bash
npm run server:dev
```

测试：

```bash
npm test
```

## 小程序迁移注意

- 页面和交互避免依赖浏览器专属 API，地图使用图片底图 + 可配置百分比点位。
- 外链和评价来源在小程序里需要域名白名单，首版只展示脱敏摘要和来源入口。
- 后续接真实采集服务时，采集结果必须进入审核池，不自动发布。

## 素材替换

地图底图位于：

```text
src/assets/map/shenzhen-handdrawn-map.png
```

后续设计师可直接替换该文件，或新增版本后在 `src/components/WeekendMap.vue` 中调整引用。若地图比例变化，需要同步调整 `src/data/weekendsz.ts` 中每个 `Place.mapPoint` 的百分比坐标。
