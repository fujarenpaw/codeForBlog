import time
import pandas as pd

def main():
    t1 = time.time()
    # 関数呼び出し
    bench3()

    t2 = time.time()
    elapsed_time = t2-t1
    print(elapsed_time)


# 読み込み列を指定
def bench3():
    read_cols = [0, 1, 2]
    base_file = r"data\001.csv"
    df = pd.read_csv(base_file, engine="python", usecols=read_cols)


if __name__ == '__main__':
    main()