---
title: 支持PormQL函数&算子
order: 11
---

以下是openGemini对Prometheus的函数和算子支持程度，总体已达90%。欢迎开发者参与进来一起完善。

具体算子和函数的功能介绍，请参考【[prometheus中文文档](https://prometheus.fuckcloudnative.io/di-san-zhang-prometheus/di-4-jie-cha-xun/functions)】

# PromQL函数支持程度

| 函数名称                                 | 是否支持 |
| ---------------------------------------- | -------- |
| Count()                                  | ✔        |
| Count_values()                           | ✖        |
| Avg()                                    | ✔        |
| Max()                                    | ✔        |
| Min()                                    | ✔        |
| Sum()                                    | ✔        |
| TopK()                                   | ✔        |
| Bottomk()                                | ✔        |
| Limitk()                                 | ✖        |
| Limit_ratio()                            | ✖        |
| Stddev()                                 | ✔        |
| Irate()                                  | ✔        |
| Rate()                                   | ✔        |
| Absent()                                 | ✔        |
| Stdvar()                                 | ✔        |
| Quantile()                               | ✔        |
| Delta()                                  | ✔        |
| Idelta()                                 | ✔        |
| Increase()                               | ✔        |
| Derives()                                | ✔        |
| Count_values()                           | ✔        |
| Group()                                  | ✖        |
| Abs()                                    | ✔        |
| Acos()                                   | ✔        |
| Asim()                                   | ✔        |
| Atan()                                   | ✔        |
| Atan2()                                  | ✔        |
| Ceil()                                   | ✔        |
| Cos()                                    | ✔        |
| Exp()                                    | ✔        |
| Floor()                                  | ✔        |
| Ln()                                     | ✔        |
| Log2()                                   | ✔        |
| Log10()                                  | ✔        |
| Round()                                  | ✔        |
| Sin()                                    | ✔        |
| Sqrt()                                   | ✔        |
| Tan()                                    | ✔        |
| Label_join                               | ✔        |
| Label_replace                            | ✔        |
| Day_of_month                             | ✔        |
| Day_of_week                              | ✔        |
| Day_of_year                              | ✔        |
| Days_in_month()                          | ✔        |
| Hour()                                   | ✔        |
| Minute()                                 | ✔        |
| Month()                                  | ✔        |
| Time()                                   | ✔        |
| Timestamp()                              | ✔        |
| Year()                                   | ✔        |
| Clamp()                                  | ✔        |
| Clamp_max()                              | ✔        |
| Clamp_min()                              | ✔        |
| Sgn()                                    | ✖        |
| Acosh()                                  | ✖        |
| Asinh()                                  | ✖        |
| Atanh()                                  | ✖        |
| Cosh()                                   | ✖        |
| Sinh()                                   | ✖        |
| Deg()                                    | ✖        |
| Pi()                                     | ✖        |
| Rad()                                    | ✖        |
| Sort()                                   | ✖        |
| Sort_desc()                              | ✖        |
| Sort_by_label()                          | ✖        |
| Sort_by_label_desc()                     | ✖        |
| Holt_winters()                           | ✔        |
| Predict_linear()                         | ✔        |
| Histogram_quantile()                     | ✔        |
| Histogram_count()                        | ✖        |
| Histogram_sum()                          | ✖        |
| Histogram_fraction()                     | ✖        |
| Histogram_avg()                          | ✖        |
| Histogram_stddev()                       | ✖        |
| Histogram_stdvar()                       | ✖        |
| Scalar()                                 | ✔        |
| Vector()                                 | ✔        |
| Avg_over_time(range-vector)              | ✔        |
| Min_over_time(range-vector)              | ✔        |
| Max_over_time(range-vector)              | ✔        |
| Sum_over_time(range-vector)              | ✔        |
| Count_over_time(range-vector)            | ✔        |
| Stddev_over_time(range-vector)           | ✔        |
| Stdvar_over_time(range-vector)           | ✔        |
| Last_over_time(range-vector)             | ✔        |
| Quantile_over_time(scalar, range-vector) | ✔        |
| Absent_over_time(range-vector)           | ✖        |
| Mad_over_time(range-vector)              | ✖        |
| Changes                                  | ✔        |
| Resets                                   | ✔        |
| Present_over_time(range-vector)          | ✔        |

# Operators支持程度

| Operator名称 | 是否支持 | 算子功能描述 |
| ------------ | -------- | ------------ |
| +            | ✔        |              |
| -            | ✔        |              |
| *            | ✔        |              |
| /            | ✔        |              |
| %            | ✔        |              |
| ^            | ✔        |              |
| ==           | ✔        |              |
| !=           | ✔        |              |
| >            | ✔        |              |
| <            | ✔        |              |
| >=           | ✔        |              |
| <=           | ✔        |              |
| and          | ✔        |              |
| or           | ✔        |              |
| unless       | ✔        |              |
| on           | ✖        |              |
| ignoring     | ✖        |              |
| group_left   | ✖        |              |
| group_right  | ✖        |              |

