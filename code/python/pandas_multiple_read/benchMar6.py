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
    bench6(csv_path_ary)

    t2 = time.time()
    elapsed_time = t2-t1
    print(elapsed_time)


# 並列化してみる
def bench6(csv_path_ary):
    p = Pool(os.cpu_count())
    df = pd.concat(p.map(bench6_multi_C, csv_path_ary))
    # p.close()


# 並列化読み込み(C engine)
def bench6_multi_C(csv_path):
    return pd.read_csv(csv_path, engine="c")


if __name__ == '__main__':
    main()