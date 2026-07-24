"""
Early Stopping Utility
"""

class EarlyStopping:

    def __init__(self, patience=5):

        self.patience = patience
        self.counter = 0
        self.best = float("-inf")

    def step(self, score):

        if score > self.best:

            self.best = score
            self.counter = 0
            return False

        self.counter += 1

        return self.counter >= self.patience