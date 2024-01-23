import time
import pandas as pd

def main():
    t1 = time.time()
    # 関数呼び出し
    bench2()
    t2 = time.time()
    elapsed_time = t2-t1
    print(elapsed_time)


# engineをpythonにする
def bench2():
    base_file = r"data\001.csv"
    df = pd.read_csv(base_file, engine="python")


if __name__ == '__main__':
    main()