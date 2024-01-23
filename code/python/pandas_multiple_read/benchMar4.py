import time
import pandas as pd
import glob


def main():
    csv_search_path = r"data\*.csv"
    csv_path_ary = glob.glob(csv_search_path)

    t1 = time.time()
    # 関数呼び出し
    bench4(csv_path_ary)

    t2 = time.time()
    elapsed_time = t2-t1
    print(elapsed_time)


# 100個のcsvをdataframeに格納
def bench4(csv_path_ary):
    for csv_path in csv_path_ary:
        tmp_df = pd.read_csv(csv_path, engine="python")

        if 'df' in locals():
            df = pd.concat([df, tmp_df])
        else:
            df = tmp_df


if __name__ == '__main__':
    main()