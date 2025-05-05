118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
import React, { useState } from "react";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: Colors.background,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    marginBottom: theme.spacing.lg,
  },
  contactsList: {
    paddingBottom: theme.spacing.lg,
  },
  contactContainer: {
    marginBottom: theme.spacing.md,
  },
  contactActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing.xs,
    ...theme.shadows.small,
  },
  editButton: {
    backgroundColor: Colors.white,
  },
  deleteButton: {
    backgroundColor: Colors.white,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    textAlign: "center",
  },
  addButton: {
    marginTop: theme.spacing.md,
  },
});