// .vue ファイルが Vue constructor と同じ構造であることを知らせるファイル
// typescript が自動的に読み込むので, tsconfigをいじる必要は無い

declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}