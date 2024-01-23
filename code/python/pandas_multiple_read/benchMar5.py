import time
import pandas as pd
from multiprocessing import Pool
import os
import glob

def main():
    csv_search_path = r"data\*.csv"
    csv_path_ary = glob.glob(csv_search_path)

    t1 = time.time()
    # 関数呼び出し
    bench5(csv_path_ary)

    t2 = time.time()
    elapsed_time = t2-t1
    print(elapsed_time)


# 並列化してみる
def bench5(csv_path_ary):
    p = Pool(os.cpu_count())
    df = pd.concat(p.map(bench5_multi, csv_path_ary))
    # p.close()


# 並列化読み込み
def bench5_multi(csv_path):
    return pd.read_csv(csv_path, engine="python")


if __name__ == '__main__':
    main()
