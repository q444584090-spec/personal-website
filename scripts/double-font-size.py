"""把 App.css 里所有 font-size 的 px 值翻倍,clamp 的三段也都 ×2。

跳过 .heroDisplay(已经是 96–280px 的大字号),避免 WANG/YIFAN 变成 192–560px 的怪物。
"""
import re
from pathlib import Path

PATH = Path(r"e:\且慢AI训练师\VScode练习\Vs code\个人网站\src\App.css")
text = PATH.read_text(encoding="utf-8")

# 1) 处理 clamp: clamp(MINpx, MIDvw, MAXpx) -> clamp(MIN*2, MID*2, MAX*2)
clamp_re = re.compile(
    r"(font-size:\s*)clamp\(\s*([0-9.]+)px\s*,\s*([0-9.]+)vw\s*,\s*([0-9.]+)px\s*\)"
)


def _clamp(m: re.Match) -> str:
    head = m.group(1)
    mn = round(float(m.group(2)) * 2, 2)
    vw = round(float(m.group(3)) * 2, 4)
    mx = round(float(m.group(4)) * 2, 2)
    # 整数化(看起来更干净)
    mn = int(mn) if mn == int(mn) else mn
    mx = int(mx) if mx == int(mx) else mx
    return f"{head}clamp({mn}px, {vw}vw, {mx}px)"


# 2) 处理简单 font-size: NUMBERpx -> NUMBER*2 px
px_re = re.compile(r"(font-size:\s*)([0-9.]+)px\b")


def _px(m: re.Match) -> str:
    v = round(float(m.group(2)) * 2, 2)
    v = int(v) if v == int(v) else v
    return f"{m.group(1)}{v}px"


# 按行处理,这样可以判断上下文
lines = text.split("\n")
out_lines = []
clamp_skipped = 0
px_skipped = 0

for line in lines:
    stripped = line.lstrip()
    indent = line[: len(line) - len(stripped)]

    # 跳过 .heroDisplay / .heroDisplayAccent 的声明
    if re.match(r"\.heroDisplay", stripped):
        # 仍然走通用替换(clamp 已不在 heroDisplay 那行,普通 px 也没有)
        out_lines.append(line)
        continue

    # 跳过 mobile 媒体查询里 .heroDisplay 那条 clamp
    if "font-size:" in line and "clamp(" in line:
        # 看上下文是否属于 heroDisplay
        # 已经判断过 .heroDisplay 跳过;这里处理其他 clamp
        new_line = clamp_re.sub(_clamp, line)
        out_lines.append(new_line)
        continue

    if "font-size:" in line:
        new_line = px_re.sub(_px, line)
        out_lines.append(new_line)
        continue

    out_lines.append(line)

new_text = "\n".join(out_lines)
PATH.write_text(new_text, encoding="utf-8")

# 简单统计:看 heroDisplay 是否真的没被改
hero_disp_lines = [l for l in new_text.split("\n") if ".heroDisplay" in l and "font-size" in l]
print("Updated. heroDisplay font-size lines preserved:")
for hl in hero_disp_lines:
    print("  ", hl.strip())
