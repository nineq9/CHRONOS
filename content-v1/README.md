# CHRONOS Content Graph v1

CHRONOSの教材を「長い記事の集合」ではなく、**1ページ = 1つの問いに答える小さな知識ノード**として管理するための構造です。

## 基本単位

- `page` — ユーザーが読む1ページ。必ず1つの問いと1つの主結論を持つ。
- `topic` — ページの読む順番。例: ヴァイキング時代。
- `entity` — 人物・国家・民族・宗教・技術・都市など。
- `place` — 地域・都市・文化圏。
- `source` — 博物館、一次史料、論文、大学など。
- `relation` — 原因・結果・影響・比較・同時代などの関係。

## 1ページの表示原則

1. `question` — 今から何を知るのか
2. `answer` — 結論を最初に伝える
3. `story` — 初心者が前提知識なしで読める物語
4. `evidence` — なぜそう言えるか
5. `so_what` — 世界史の中で何が重要か
6. `layers` — 詳しい人だけ開く DETAIL / CONNECT / SOURCE / DEBATE
7. `next` — 次に読むページ

専門語は、初登場時に本文だけで意味が分かるようにします。DETAILを開かないと本筋が理解できない構造は禁止です。

## メタデータ

各ページは以下を持ちます。

- `period.start / period.end`
- `places`
- `domains` — politics / religion / philosophy / technology / economy / daily-life / military / environment / culture など
- `entities`
- `topics`
- `concepts` — MY MAPで理解を測る最小概念
- `timeline` — 年表での表示レイヤーと重要度
- `image` — GitHubに画像を保存せず、取得用クエリと優先ソースを保持
- `sources` — 主張を支える出典ID
- `relations` — 他ページへの因果・比較・同時代リンク

## relation type

- `causes`
- `contributes_to`
- `leads_to`
- `influences`
- `reaction_to`
- `same_time_as`
- `compare_with`
- `part_of`

## 読み込み方

`index.json` は軽い索引だけを持ちます。アプリ起動時は索引のみ読み、ページ本文はタップされた時に個別JSONを `fetch()` します。世界史が数千〜数万ページになっても、最初からすべてをスマホへ読み込まない設計です。

## v1 の実証範囲

最初の実証として「ヴァイキング時代」を12ページに分割しています。同じページをTOPICS、年表、関連ページ、地域・分野フィルターから再利用できる構造にします。
