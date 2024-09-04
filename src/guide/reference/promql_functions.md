---
title: Functions&Operators(PromQL)
order: 11
---

The following are the statistics of openGemini support for Prometheus functions and operators, which has reached 90% overall. welcome to join us.

For a detailed introduction to the functions of operators and functions, please refer to [prometheus Documentation](https://prometheus.io/docs/prometheus/latest/querying/functions/)

# The Prometheus Functions

| Functions                                | Support or not by openGemini |
| ---------------------------------------- | ---------------------------- |
| Count()                                  | ✔                            |
| Count_values()                           | ✖                            |
| Avg()                                    | ✔                            |
| Max()                                    | ✔                            |
| Min()                                    | ✔                            |
| Sum()                                    | ✔                            |
| TopK()                                   | ✔                            |
| Bottomk()                                | ✔                            |
| Limitk()                                 | ✖                            |
| Limit_ratio()                            | ✖                            |
| Stddev()                                 | ✔                            |
| Irate()                                  | ✔                            |
| Rate()                                   | ✔                            |
| Absent()                                 | ✔                            |
| Stdvar()                                 | ✔                            |
| Quantile()                               | ✔                            |
| Delta()                                  | ✔                            |
| Idelta()                                 | ✔                            |
| Increase()                               | ✔                            |
| Derives()                                | ✔                            |
| Count_values()                           | ✔                            |
| Group()                                  | ✖                            |
| Abs()                                    | ✔                            |
| Acos()                                   | ✔                            |
| Asim()                                   | ✔                            |
| Atan()                                   | ✔                            |
| Atan2()                                  | ✔                            |
| Ceil()                                   | ✔                            |
| Cos()                                    | ✔                            |
| Exp()                                    | ✔                            |
| Floor()                                  | ✔                            |
| Ln()                                     | ✔                            |
| Log2()                                   | ✔                            |
| Log10()                                  | ✔                            |
| Round()                                  | ✔                            |
| Sin()                                    | ✔                            |
| Sqrt()                                   | ✔                            |
| Tan()                                    | ✔                            |
| Label_join                               | ✔                            |
| Label_replace                            | ✔                            |
| Day_of_month                             | ✔                            |
| Day_of_week                              | ✔                            |
| Day_of_year                              | ✔                            |
| Days_in_month()                          | ✔                            |
| Hour()                                   | ✔                            |
| Minute()                                 | ✔                            |
| Month()                                  | ✔                            |
| Time()                                   | ✔                            |
| Timestamp()                              | ✔                            |
| Year()                                   | ✔                            |
| Clamp()                                  | ✔                            |
| Clamp_max()                              | ✔                            |
| Clamp_min()                              | ✔                            |
| Sgn()                                    | ✖                            |
| Acosh()                                  | ✖                            |
| Asinh()                                  | ✖                            |
| Atanh()                                  | ✖                            |
| Cosh()                                   | ✖                            |
| Sinh()                                   | ✖                            |
| Deg()                                    | ✖                            |
| Pi()                                     | ✖                            |
| Rad()                                    | ✖                            |
| Sort()                                   | ✖                            |
| Sort_desc()                              | ✖                            |
| Sort_by_label()                          | ✖                            |
| Sort_by_label_desc()                     | ✖                            |
| Holt_winters()                           | ✔                            |
| Predict_linear()                         | ✔                            |
| Histogram_quantile()                     | ✔                            |
| Histogram_count()                        | ✖                            |
| Histogram_sum()                          | ✖                            |
| Histogram_fraction()                     | ✖                            |
| Histogram_avg()                          | ✖                            |
| Histogram_stddev()                       | ✖                            |
| Histogram_stdvar()                       | ✖                            |
| Scalar()                                 | ✔                            |
| Vector()                                 | ✔                            |
| Avg_over_time(range-vector)              | ✔                            |
| Min_over_time(range-vector)              | ✔                            |
| Max_over_time(range-vector)              | ✔                            |
| Sum_over_time(range-vector)              | ✔                            |
| Count_over_time(range-vector)            | ✔                            |
| Stddev_over_time(range-vector)           | ✔                            |
| Stdvar_over_time(range-vector)           | ✔                            |
| Last_over_time(range-vector)             | ✔                            |
| Quantile_over_time(scalar, range-vector) | ✔                            |
| Absent_over_time(range-vector)           | ✖                            |
| Mad_over_time(range-vector)              | ✖                            |
| Changes                                  | ✔                            |
| Resets                                   | ✔                            |
| Present_over_time(range-vector)          | ✔                            |

# The Prometheus Operators

| Operators   | Support or not by openGemini |
| ----------- | ---------------------------- |
| +           | ✔                            |
| -           | ✔                            |
| *           | ✔                            |
| /           | ✔                            |
| %           | ✔                            |
| ^           | ✔                            |
| ==          | ✔                            |
| !=          | ✔                            |
| >           | ✔                            |
| <           | ✔                            |
| >=          | ✔                            |
| <=          | ✔                            |
| and         | ✔                            |
| or          | ✔                            |
| unless      | ✔                            |
| on          | ✖                            |
| ignoring    | ✖                            |
| group_left  | ✖                            |
| group_right | ✖                            |

