import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Задати точки на кубі
points = np.array([
    [0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1],
    [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]
])

# Визначити функцію Q(u, v)
def Q(u, v):
    # Лінійна інтерполяція між точками куба
    # Для спрощення будемо використовувати середнє значення
    return (1 - u) * (1 - v) * points[0] + \
           (1 - u) * v * points[1] + \
           u * (1 - v) * points[2] + \
           u * v * points[3]

# Генерація сітки для значень u, v
u = np.linspace(0, 1, 10)
v = np.linspace(0, 1, 10)
U, V = np.meshgrid(u, v)

# Обчислити значення Q(u, v)
Z = Q(U, V)

# Візуалізація проекцій
fig = plt.figure(figsize=(12, 8))

# Проекція на площину x=0
ax1 = fig.add_subplot(131)
ax1.plot(U, V, Z, label='Проекція на x=0')
ax1.set_title('Проекція на x=0')
ax1.set_xlabel('u')
ax1.set_ylabel('v')

# Проекція на площину y=0
ax2 = fig.add_subplot(132)
ax2.plot(U, V, Z, label='Проекція на y=0')
ax2.set_title('Проекція на y=0')
ax2.set_xlabel('u')
ax2.set_ylabel('v')

# Проекція на площину z=0
ax3 = fig.add_subplot(133)
ax3.plot(U, V, Z, label='Проекція на z=0')
ax3.set_title('Проекція на z=0')
ax3.set_xlabel('u')
ax3.set_ylabel('v')

plt.tight_layout()
plt.show()
